import { Injectable } from '@nestjs/common';

@Injectable()
export class TextNormalizerService {
  normalize(text: string): string {
    return text.toLowerCase().replace(/[\W_]+/g, ' ');
  }
}
