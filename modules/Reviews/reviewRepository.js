import { apiClient } from "@/utils/api";

const END_POINT = '/api/reviews';

export const reviewRepository = {
  create: async (reviewData) => {
    const { data } = await apiClient.post(END_POINT, reviewData);
    return data;
  },
  fetchAll: async (params) => {
    const { data } = await apiClient.get(END_POINT, { params });
    return data;
  }
};