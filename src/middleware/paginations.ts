import { Request, Response, NextFunction } from "express";

export interface IPaginationType extends Request {
  pagination?: {
    page: number;
    perPage: number;
    skip: number;
  };
}

export const paginationMiddleware = (defaultPerPage: number = 10) => {
  return (req: IPaginationType, res: Response, next: NextFunction) => {
    const page = parseInt((req.query.page as string) || "1");
    const perPage = parseInt((req.query.perPage as string) || defaultPerPage.toString());
    const skip = (page - 1) * perPage;

    req.pagination = {
      page,
      perPage,
      skip,
    };

    next();
  };
};
