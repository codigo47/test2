import { Injectable } from '@nestjs/common';
import { Keyword } from './interfaces/keyword.interface';

@Injectable()
export class RelevanceScorerService {
  score(context: string, relevantKeywords: Keyword[]): number {
    const lowerContext = context.toLowerCase();
    let score = 0;

    relevantKeywords.forEach(({ keyword, weight }) => {
      if (lowerContext.includes(keyword)) {
        score += weight;
      }
    });

    const totalWeight = relevantKeywords.reduce(
      (sum, { weight }) => sum + weight,
      0,
    );
    const normalizedScore = totalWeight > 0 ? score / totalWeight : 0;

    return normalizedScore;
  }
}
