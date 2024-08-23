import { Module } from '@nestjs/common';
import { TextNormalizerService } from './text-normalizer.service';
import { MentionDetectorService } from './mention-detector.service';
import { ContextualAnalyzerService } from './contextual-analyzer.service';
import { RelevanceScorerService } from './relevance-scorer.service';
import { ExclusionCriteriaService } from './exclusion-criteria.service';
import { FilterService } from './filter.service';
import { BitlyFilterService } from '../bitlyFilter/bitly-filter.service';

@Module({
  providers: [
    TextNormalizerService,
    MentionDetectorService,
    ContextualAnalyzerService,
    RelevanceScorerService,
    ExclusionCriteriaService,
    FilterService,
    BitlyFilterService,
  ],
  exports: [BitlyFilterService],
})
export class FilterModule {}
