import { NextRequest } from "next/server";

const getRouteParams = (request: NextRequest) => {
  const url = request.nextUrl;
  const params = Object.fromEntries(url.searchParams.entries());
  return params;
};

export default getRouteParams;
