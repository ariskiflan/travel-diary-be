import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";

export const uploadFile = (fieldName: string) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./src/uploads");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now();
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({ storage });

  return (req: Request, res: Response, next: NextFunction) => {
    upload.single(fieldName)(req, res, (error) => {
      if (error) {
        res.status(400).json({ Error: "File Upload Failed!" });
      }

      if (!req.file) {
        res.status(400).json({ error: "No file uploaded!" });
      } else {
        res.locals.filename = req.file.filename;
        next();
      }
    });
  };
};
