import { Injectable } from '@nestjs/common';

@Injectable()
export class ContextualAnalyzerService {
  analyze(
    mention: string,
    context: string,
    relevantKeywords: string[],
    irrelevantKeywords: string[],
  ): boolean {
    const lowerContext = context.toLowerCase();

    const hasRelevantKeywords = relevantKeywords.some((keyword) =>
      lowerContext.includes(keyword),
    );

    const hasIrrelevantKeywords = irrelevantKeywords.some((keyword) =>
      lowerContext.includes(keyword),
    );

    return hasRelevantKeywords && !hasIrrelevantKeywords;
  }
}
