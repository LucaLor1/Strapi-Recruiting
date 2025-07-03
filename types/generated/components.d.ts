import type { Schema, Struct } from '@strapi/strapi';

export interface CandidateProfile extends Struct.ComponentSchema {
  collectionName: 'components_candidate_profiles';
  info: {
    description: '';
    displayName: 'profile';
  };
  attributes: {
    experience: Schema.Attribute.Text;
    languages: Schema.Attribute.Blocks;
    name: Schema.Attribute.String;
    skills: Schema.Attribute.Blocks;
    surname: Schema.Attribute.String;
  };
}

export interface CompanyProfile extends Struct.ComponentSchema {
  collectionName: 'components_company_profiles';
  info: {
    description: '';
    displayName: 'profile';
  };
  attributes: {
    description: Schema.Attribute.Text;
    headquarters: Schema.Attribute.RichText;
    logoUrl: Schema.Attribute.String;
    name: Schema.Attribute.String;
    sectors: Schema.Attribute.RichText;
    socialLink: Schema.Attribute.JSON;
  };
}

export interface CompanyStats extends Struct.ComponentSchema {
  collectionName: 'components_company_stats';
  info: {
    displayName: 'stats';
  };
  attributes: {
    conversionRate: Schema.Attribute.Decimal;
    geoDistribution: Schema.Attribute.JSON;
    totalApplications: Schema.Attribute.Integer;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'candidate.profile': CandidateProfile;
      'company.profile': CompanyProfile;
      'company.stats': CompanyStats;
    }
  }
}
