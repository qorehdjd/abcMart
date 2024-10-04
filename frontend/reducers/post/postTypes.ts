export interface PostState {
  posts: ImagePair[];
  analysisLoading: Boolean; // 분석 시도중
  analysisDone: Boolean;
  analysisError: null | string;
}

export interface ImagePair {
  in: string;
  out: string;
}

export interface AnalysisPayload {
  formData: FormData;
}
