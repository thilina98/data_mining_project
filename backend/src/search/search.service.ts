import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchBody } from 'src/types/search-body.type';

@Injectable()
export class SearchService {
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {}

  async search(inputBody: SearchBody): Promise<{
    hits: Record<string, any>[];
    aggs: Record<string, any>;
  }> {
    //get all
    const body = {
      size: 1000,
      from: 0,
      query: inputBody.query,
      aggs: inputBody.aggs,
    };
    const result = await this.esService.search({
      index: this.configService.get('ELASTICSEARCH_INDEX'),
      body,
    });
    return {
      hits: result.hits.hits,
      aggs: result.aggregations,
    };
  }
}
