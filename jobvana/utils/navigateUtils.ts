import { NextRouter } from "next/router";

interface PageRouteProps {
  pageRoute: string;
}

export const routeToNextPage = (router: NextRouter, { pageRoute }: PageRouteProps) => {
  router.push(pageRoute, undefined, { shallow: false });
};
