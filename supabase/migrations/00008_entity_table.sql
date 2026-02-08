-- Entity Table: Projects
-- Auto-generated from IdeaLaunch pipeline

CREATE TABLE IF NOT EXISTS public.entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,

  -- Project fields
  project_name TEXT NOT NULL,
  saas_idea_description TEXT NOT NULL,
  target_audience TEXT[] NOT NULL,
  validation_stage TEXT NOT NULL DEFAULT 'Idea Input',
  validation_verdict TEXT DEFAULT 'Pending',
  confidence_score INTEGER,
  conversations_collected INTEGER,
  channels_discovered TEXT[],
  key_insights TEXT,
  report_url TEXT,
  created_at TIMESTAMPTZ NOT NULL,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_entities_user_id ON public.entities(user_id);

CREATE INDEX IF NOT EXISTS idx_entities_created_at ON public.entities(created_at DESC);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_entity_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER entities_updated_at
  BEFORE UPDATE ON public.entities
  FOR EACH ROW EXECUTE FUNCTION update_entity_updated_at();

-- RLS Policies
ALTER TABLE public.entities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own entities"
  ON public.entities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own entities"
  ON public.entities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own entities"
  ON public.entities FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own entities"
  ON public.entities FOR DELETE
  USING (auth.uid() = user_id);
