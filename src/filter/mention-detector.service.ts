import { Injectable } from '@nestjs/common';
import { TextNormalizerService } from './text-normalizer.service';

@Injectable()
export class MentionDetectorService {
  constructor(private readonly textNormalizer: TextNormalizerService) {}

  detect(text: string, terms: string[]): string[] {
    const normalizedText = this.textNormalizer.normalize(text);
    return terms.filter((term) => normalizedText.includes(term));
  }
}
