import { Injectable } from '@nestjs/common';
import { MentionDetectorService } from './mention-detector.service';
import { ContextualAnalyzerService } from './contextual-analyzer.service';
import { RelevanceScorerService } from './relevance-scorer.service';
import { ExclusionCriteriaService } from './exclusion-criteria.service';
import { Keyword } from './interfaces/keyword.interface';

@Injectable()
export class FilterService {
  constructor(
    private readonly mentionDetector: MentionDetectorService,
    private readonly contextualAnalyzer: ContextualAnalyzerService,
    private readonly relevanceScorer: RelevanceScorerService,
    private readonly exclusionCriteria: ExclusionCriteriaService,
  ) {}

  filter(
    text: string,
    terms: string[],
    relevantKeywords: string[],
    irrelevantKeywords: string[],
    scoreRelevantKeywords: Keyword[],
  ): string[] {
    const mentions = this.mentionDetector.detect(text, terms);

    return mentions.filter((mention) => {
      if (this.exclusionCriteria.exclude(mention)) return false;

      const context = this.extractContext(text, mention);
      const isRelevant = this.contextualAnalyzer.analyze(
        mention,
        context,
        relevantKeywords,
        irrelevantKeywords,
      );
      const score = this.relevanceScorer.score(context, scoreRelevantKeywords);

      return isRelevant && score > 0.04;
    });
  }

  private extractContext(text: string, mention: string): string {
    return text; // placeholder: return the entire text for now
  }
}
