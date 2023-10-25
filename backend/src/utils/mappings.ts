export const mappings = {
  settings: {
    index: {
      analysis: {
        analyzer: {
          plain: {
            filter: [],
            tokenizer: 'standard',
          },
          case_insensitive: {
            filter: ['lowercase'],
            tokenizer: 'standard',
          },
          inflections: {
            filter: ['porter_stem'],
            tokenizer: 'standard',
          },
          case_insensitive_and_inflections: {
            filter: ['lowercase', 'porter_stem'],
            tokenizer: 'standard',
          },
        },
      },
    },
  },
  mappings: {
    properties: {
      product_id: {
        type: 'keyword',
      },
      poem_name: {
        type: 'text',
        analyzer: 'plain',
        fields: {
          case_insensitive: {
            type: 'text',
            analyzer: 'case_insensitive',
          },
          inflections: {
            type: 'text',
            analyzer: 'inflections',
          },
          case_insensitive_and_inflections: {
            type: 'text',
            analyzer: 'case_insensitive_and_inflections',
          },
        },
      },
      poet: {
        type: 'text',
        analyzer: 'plain',
        fields: {
          case_insensitive: {
            type: 'text',
            analyzer: 'case_insensitive',
          },
          inflections: {
            type: 'text',
            analyzer: 'inflections',
          },
          case_insensitive_and_inflections: {
            type: 'text',
            analyzer: 'case_insensitive_and_inflections',
          },
        },
      },
      line: {
        type: 'text',
        analyzer: 'plain',
        fields: {
          case_insensitive: {
            type: 'text',
            analyzer: 'case_insensitive',
          },
          inflections: {
            type: 'text',
            analyzer: 'inflections',
          },
          case_insensitive_and_inflections: {
            type: 'text',
            analyzer: 'case_insensitive_and_inflections',
          },
        },
      },
      metaphor_present_or_not: {
        type: 'keyword',
      },
      count_of_the_metaphor: {
        type: 'integer',
      },
      metaphorical_terms: {
        type: 'text',
        analyzer: 'plain',
        fields: {
          case_insensitive: {
            type: 'text',
            analyzer: 'case_insensitive',
          },
          inflections: {
            type: 'text',
            analyzer: 'inflections',
          },
          case_insensitive_and_inflections: {
            type: 'text',
            analyzer: 'case_insensitive_and_inflections',
          },
        },
      },
      year: {
        type: 'keyword',
      },
      meaning: {
        type: 'text',
        analyzer: 'plain',
        fields: {
          case_insensitive: {
            type: 'text',
            analyzer: 'case_insensitive',
          },
          inflections: {
            type: 'text',
            analyzer: 'inflections',
          },
          case_insensitive_and_inflections: {
            type: 'text',
            analyzer: 'case_insensitive_and_inflections',
          },
        },
      },
      domain: {
        type: 'keyword',
      },
      type: {
        type: 'keyword',
      },
    },
  },
};
