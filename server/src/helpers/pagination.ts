import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT } from '@viraladda/constants';

export const getPagination = (page?: string | number, limit?: string | number) => {
  const parsedPage = Math.max(Number(page) || DEFAULT_PAGE, 1);
  const parsedLimit = Math.min(Math.max(Number(limit) || DEFAULT_LIMIT, 1), MAX_LIMIT);

  return {
    page: parsedPage,
    limit: parsedLimit,
    skip: (parsedPage - 1) * parsedLimit
  };
};
