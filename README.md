<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Content Filtering Module

## Overview

This module is designed to filter text data based on contextual relevance, particularly for tracking mentions of specific terms or entities. The module is flexible and can be adapted to various filtering tasks.

### Bitly Filter

The provided example focuses on filtering mentions of the company "Bitly," excluding irrelevant mentions such as short links.

### How It Works

1. **Normalization:** Text is normalized to ensure consistency.
2. **Detection:** Potential mentions are identified based on predefined terms.
3. **Contextual Analysis:** Each mention is analyzed within its context to determine relevance.
4. **Scoring:** Mentions are scored based on their contextual relevance.
5. **Exclusion:** Irrelevant mentions are excluded based on predefined rules.

#### BitlyFilterService
The BitlyFilterService is designed to detect relevant mentions of "Bitly" by using a combination of:

Bitly Variants:

The service recognizes different variants of "Bitly" such as 'bitly', 'bit.ly', and 'bitly.com'.

Relevant Keywords:

The service checks the context around each mention of "Bitly" using relevant keywords such as 'company', 'service', 'tool', and 'product'.

Irrelevant Keywords:

The service filters out irrelevant mentions, particularly those involving URLs, by using keywords like 'http', 'https'.

Scoring Keywords:

The service also scores the context based on a set of weighted keywords to determine the relevance of each mention.

### Example Usage

```typescript
import { BitlyFilterService } from './src/bitlyFilter/bitly-filter.service';

const text = 'Bitly is a great tool for shortening URLs';
const mentions = BitlyFilterService.filter(text);
console.log(mentions); // should print ['bitly']

_________________________________________________

import { BitlyFilterService } from './src/bitlyFilter/bitly-filter.service';

const text = 'Check out this link: https://bit.ly/3YX4Nr9';
const mentions = BitlyFilterService.filter(text);
console.log(mentions); // should print []

```

### Explanation

This method takes a string text as input and returns an array of relevant mentions, excluding irrelevant ones like short URLs.
The service uses a combination of relevant and irrelevant keywords to determine which mentions to include.


### Approach to the BitlyFilterService Implementation
The BitlyFilterService is designed to accurately identify and filter mentions of "Bitly" within a given text. The approach taken combines different strategies to ensure that only relevant mentions are captured, while irrelevant references, such as URLs, are excluded

1. Handling Bitly Variants
The first challenge was to recognize different ways the term "Bitly" might appear in text. This was addressed by defining a list of bitlyVariants:

```typescript
private bitlyVariants = ['bitly', 'bit.ly', 'bitly.com'];
```
These variants account for common ways people refer to the company, including its full name, short domain, and the .com domain. The filter service uses this list to detect mentions in various formats.

2. Contextual Relevance
Simply detecting a variant of "Bitly" is not enough; the context in which the mention appears must be considered. To achieve this, we used two sets of keywords:

Relevant Keywords:

```typescript
private relevantKeywords = ['bitly', 'company', 'service', 'tool', 'product'];
```

These keywords are used to ensure that the context around a detected mention of "Bitly" is relevant to discussions about the company. For example, if "Bitly" is mentioned alongside "company" or "service," it is more likely to be a relevant mention.

Irrelevant Keywords:

```typescript
private irrelevantKeywords = ['http', 'https'];
```

Irrelevant keywords are used to filter out contexts that do not pertain to the company itself. In this case, mentions of "Bitly" within URLs (e.g., http://bit.ly/...) are excluded, as they are generally not relevant to discussions about the company.

3. Scoring Contextual Relevance
To further refine the filtering process, there is a scoring mechanism based on the presence of specific keywords in the context:

```typescript
private scoreRelevantKeywords: Keyword[] = [
  { keyword: 'company', weight: 15 },
  { keyword: 'service', weight: 15 },
  { keyword: 'platform', weight: 15 },
  { keyword: 'tool', weight: 15 },
  { keyword: 'product', weight: 15 },
  // ...
];
```
Each keyword in the scoreRelevantKeywords list is assigned a weight, reflecting its importance in determining the relevance of a mention. For example, if "company" or "service" appears near a mention of "Bitly," it is weighted heavily, increasing the likelihood that the mention is relevant.

### Potential Areas of Improvement

1. Add AI for Better Accuracy
Incorporating AI could enhance the filtering process by learning from context and identifying relevant mentions more accurately than just using keywords.

2. Integrate Sentiment Analysis
Adding sentiment analysis would allow the service to not only detect mentions but also understand the tone—whether it’s positive, negative, or neutral—giving more insight into how "Bitly" is being discussed.

