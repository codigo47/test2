import { Injectable } from '@nestjs/common';

@Injectable()
export class ExclusionCriteriaService {
  exclude(text: string): boolean {
    const urlPattern = /https?:\/\/bit\.ly\/[a-zA-Z0-9]+/;
    return urlPattern.test(text);
  }
}
