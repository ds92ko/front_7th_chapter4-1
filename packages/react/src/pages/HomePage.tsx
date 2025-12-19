import { useEffect } from "react";
import { loadNextProducts, loadProductsAndCategories, ProductList, SearchBar } from "../entities";
import { useRouterContext } from "../router/RouterContext";
import { PageWrapper } from "./PageWrapper";

const headerLeft = (
  <h1 className="text-xl font-bold text-gray-900">
    <a href="/" data-link="/">
      쇼핑몰
    </a>
  </h1>
);

export const HomePage = () => {
  const router = useRouterContext();

  // 무한 스크롤 이벤트 등록
  useEffect(() => {
    const scrollHandler = () => loadNextProducts(router);
    window.addEventListener("scroll", scrollHandler);

    const hasInitialData = window.__INITIAL_DATA__;
    if (!hasInitialData) {
      loadProductsAndCategories(router);
    }

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [router]);

  return (
    <PageWrapper headerLeft={headerLeft}>
      {/* 검색 및 필터 */}
      <SearchBar />

      {/* 상품 목록 */}
      <div className="mb-6">
        <ProductList />
      </div>
    </PageWrapper>
  );
};
