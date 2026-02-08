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
      placeholder: 'e.g., ConvoFlow - Conversational Research Engine',
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
      options: ['Indie Hackers', 'Solo Founders', 'Early-stage Startup Founders', 'Product Managers', 'Freelancers', 'Agency Owners', 'Developer Tools Users', 'Creator Economy', 'E-commerce Founders'],
      showInList: true,
      showInForm: true,
    },
    {
      name: 'validation_stage',
      label: 'Validation Stage',
      type: 'select',
      required: true,
      options: ['Idea Submitted', 'Channels Discovered', 'Templates Generated', 'Responses Collected', 'Analysis Complete'],
      defaultValue: 'Idea Submitted',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'validation_verdict',
      label: 'Validation Verdict',
      type: 'select',
      required: false,
      options: ['Go', 'Cautious Go', 'No-Go', 'Insufficient Data'],
      showInList: false,
      showInForm: false,
    },
    {
      name: 'confidence_score',
      label: 'Confidence Score',
      type: 'number',
      required: false,
      placeholder: '0-100',
      showInList: false,
      showInForm: false,
    },
    {
      name: 'responses_collected',
      label: 'Responses Collected',
      type: 'number',
      required: false,
      placeholder: 'Number of pasted responses',
      showInList: false,
      showInForm: false,
    },
    {
      name: 'key_assumptions',
      label: 'Key Assumptions',
      type: 'rich-text',
      required: false,
      placeholder: 'What are your riskiest assumptions about this idea?',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'created_at',
      label: 'Created At',
      type: 'datetime',
      required: true,
      showInList: false,
      showInForm: false,
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
