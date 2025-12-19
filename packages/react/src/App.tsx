import { useRouter } from "@hanghae-plus/lib";
import { useEffect } from "react";
import { ModalProvider, ToastProvider } from "./components";
import { useLoadCartStore } from "./entities";
import { useCurrentPage, useRouterContext } from "./router";
import { updateTitle } from "./utils/updateTitle";

const CartInitializer = () => {
  useLoadCartStore();
  return null;
};

/**
 * 전체 애플리케이션 렌더링
 */
export const App = () => {
  const router = useRouterContext();
  const PageComponent = useCurrentPage();
  const route = useRouter(router, ({ route: r }) => r);

  useEffect(() => {
    updateTitle(router);
  }, [router, route]);

  return (
    <>
      <ToastProvider>
        <ModalProvider>{PageComponent ? <PageComponent /> : null}</ModalProvider>
      </ToastProvider>
      <CartInitializer />
    </>
  );
};
