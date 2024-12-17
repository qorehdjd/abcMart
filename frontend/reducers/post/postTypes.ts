export interface PostState {
  posts: any;
  analysisLoading: Boolean; // 분석 시도중
  analysisDone: Boolean;
  analysisError: null | string;
}

export interface AnalysisPayload {
  formData: FormData;
}

export interface AnalysisResult {
  input: Record<string, string>;
  output: Record<string, string>;
  angles: Record<string, string>;
}
