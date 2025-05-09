import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FileExtenderTheoryMaterial implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    req.file['description'] = req.body.description;
    req.file['usage'] = req.body.usage === 'true';
    req.file['id'] = Number(req.body.idSubtopic);
    return next.handle();
  }
}

@Injectable()
export class FilesExtenderDescription implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const descriptions = req.body.descriptions;
    req.files.forEach(
      (el: Express.Multer.File, index: number) =>
        (el['description'] = descriptions[index]),
    );
    return next.handle();
  }
}
