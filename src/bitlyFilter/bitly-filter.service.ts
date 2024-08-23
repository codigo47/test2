import { Injectable } from '@nestjs/common';
import { FilterService } from '../filter/filter.service';
import { ContextualAnalyzerService } from '../filter/contextual-analyzer.service';
import { Keyword } from '../filter/interfaces/keyword.interface';

@Injectable()
export class BitlyFilterService {
  private bitlyVariants = ['bitly', 'bit.ly', 'bitly.com'];
  private relevantKeywords = ['bitly', 'company', 'service', 'tool', 'product'];
  private irrelevantKeywords = ['http', 'https'];
  private scoreRelevantKeywords: Keyword[] = [
    { keyword: 'company', weight: 15 },
    { keyword: 'service', weight: 15 },
    { keyword: 'platform', weight: 15 },
    { keyword: 'tool', weight: 15 },
    { keyword: 'product', weight: 15 },
    { keyword: 'business', weight: 5 },
    { keyword: 'solution', weight: 5 },
    { keyword: 'startup', weight: 15 },
    { keyword: 'technology', weight: 2 },
    { keyword: 'feature', weight: 10 },
    { keyword: 'issue', weight: 15 },
    { keyword: 'problem', weight: 15 },
    { keyword: 'error', weight: 15 },
    { keyword: 'bug', weight: 15 },
    { keyword: 'complaint', weight: 15 },
    { keyword: 'support', weight: 15 },
    { keyword: 'fail', weight: 15 },
    { keyword: 'downtime', weight: 15 },
    { keyword: 'refund', weight: 15 },
    { keyword: 'broken', weight: 15 },
    { keyword: 'how', weight: 5 },
    { keyword: 'why', weight: 5 },
    { keyword: 'help', weight: 15 },
    { keyword: 'can', weight: 5 },
    { keyword: 'what', weight: 5 },
    { keyword: 'working', weight: 15 },
  ];

  constructor(
    private readonly filterService: FilterService,
    private readonly contextualAnalyzer: ContextualAnalyzerService,
  ) {}

  filter(text: string): string[] {
    return this.filterService.filter(
      text,
      this.bitlyVariants,
      this.relevantKeywords,
      this.irrelevantKeywords,
      this.scoreRelevantKeywords,
    );
  }
}
