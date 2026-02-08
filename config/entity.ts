import { Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type FieldType =
  | 'text'
  | 'rich-text'
  | 'number'
  | 'currency'
  | 'date'
  | 'datetime'
  | 'boolean'
  | 'select'
  | 'multi-select'
  | 'tags'
  | 'url'
  | 'email'

export interface EntityField {
  name: string
  label: string
  type: FieldType
  required: boolean
  placeholder?: string
  description?: string
  options?: string[]
  defaultValue?: string | number | boolean
  showInList?: boolean
  showInForm?: boolean
}

export interface EntityConfig {
  name: string
  pluralName: string
  slug: string
  icon: LucideIcon
  fields: EntityField[]
  titleField: string
  descriptionField?: string
  defaultSort: { field: string; direction: 'asc' | 'desc' }
  allowCreate: boolean
  allowEdit: boolean
  allowDelete: boolean
  allowExport: boolean
}

export const entityConfig: EntityConfig = {
  name: 'Project',
  pluralName: 'Projects',
  slug: 'projects',
  icon: Rocket,

  fields: [
    {
      name: 'project_name',
      label: 'Project Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., AI Writing Assistant for Developers',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'saas_idea_description',
      label: 'SaaS Idea Description',
      type: 'rich-text',
      required: true,
      placeholder: 'Describe your SaaS idea in detail — what problem does it solve, who is it for, and how does it work?',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'target_audience',
      label: 'Target Audience',
      type: 'multi-select',
      required: true,
      options: ['Indie Hackers', 'Solo Founders', 'Early-Stage Startup Founders', 'Product Managers', 'UX Researchers', 'Growth Marketers'],
      showInList: true,
      showInForm: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: ['Discovery', 'Collecting Responses', 'Analyzing', 'Validated', 'Invalidated', 'Pivoting'],
      defaultValue: 'Discovery',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'channels_discovered',
      label: 'Discovered Channels',
      type: 'rich-text',
      required: false,
      placeholder: 'AI-suggested channels for your target audience will appear here after discovery',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'research_templates',
      label: 'Research Templates',
      type: 'rich-text',
      required: false,
      placeholder: 'Platform-native conversation templates generated for each discovered channel',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'raw_responses',
      label: 'Raw Responses',
      type: 'rich-text',
      required: false,
      placeholder: 'Paste the messy responses from your real conversations here — include which platform/channel each came from',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'validation_verdict',
      label: 'Validation Verdict',
      type: 'text',
      required: false,
      placeholder: 'AI-generated validation verdict (auto-populated after analysis)',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'confidence_score',
      label: 'Confidence Score',
      type: 'number',
      required: false,
      placeholder: '0-100',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'analysis_report',
      label: 'Analysis Report',
      type: 'rich-text',
      required: false,
      placeholder: 'Full AI-powered analysis report with pain levels, WTP signals, key quotes, and cross-channel patterns',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'response_count',
      label: 'Response Count',
      type: 'number',
      required: false,
      placeholder: 'Total number of responses collected',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'report_url',
      label: 'Shareable Report URL',
      type: 'url',
      required: false,
      placeholder: 'https://convoflow.app/report/...',
      showInList: false,
      showInForm: true,
    }
  ],

  titleField: 'project_name',
  descriptionField: 'saas_idea_description',
  defaultSort: { field: 'created_at', direction: 'desc' },

  allowCreate: true,
  allowEdit: true,
  allowDelete: true,
  allowExport: false,
}

export function getListFields(): EntityField[] {
  return entityConfig.fields.filter((f) => f.showInList !== false)
}

export function getFormFields(): EntityField[] {
  return entityConfig.fields.filter((f) => f.showInForm !== false)
}

export function fieldTypeToSql(type: FieldType): string {
  const mapping: Record<FieldType, string> = {
    text: 'TEXT',
    'rich-text': 'TEXT',
    number: 'INTEGER',
    currency: 'NUMERIC(10,2)',
    date: 'DATE',
    datetime: 'TIMESTAMPTZ',
    boolean: 'BOOLEAN DEFAULT FALSE',
    select: 'TEXT',
    'multi-select': 'TEXT[]',
    tags: 'TEXT[]',
    url: 'TEXT',
    email: 'TEXT',
  }
  return mapping[type] || 'TEXT'
}

export function fieldTypeToZod(field: EntityField): string {
  const base: Record<FieldType, string> = {
    text: 'z.string()',
    'rich-text': 'z.string()',
    number: 'z.coerce.number()',
    currency: 'z.coerce.number()',
    date: 'z.string()',
    datetime: 'z.string()',
    boolean: 'z.boolean()',
    select: `z.enum([${field.options?.map((o) => `'${o}'`).join(', ') || "'draft'"}])`,
    'multi-select': 'z.array(z.string())',
    tags: 'z.array(z.string())',
    url: 'z.string().url()',
    email: 'z.string().email()',
  }
  let schema = base[field.type] || 'z.string()'
  if (!field.required) {
    schema += '.optional()'
  }
  return schema
}
