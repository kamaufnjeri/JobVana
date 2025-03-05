import { JobResponseProps } from "@/interfaces";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
import type { NextApiRequest, NextApiResponse } from "next";

// Define a custom response type
type ApiResponseDataProps = {
  message: string;
  error?: string;
  job?: JobResponseProps;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseDataProps> // Use the custom response type here
) => {
    const { id } = req.query;

  try {

    // Get jobs
    const response = await api.get(`job/${id}`);
    if (response.status === 200) {
      res.status(200).json({
        message: "Jobs fetched successfully",
        job: response.data.data,
      });
    }
  } catch (error) {
    console.log('error', error);
    const errorMesssage = handleApiError(error);
    res.status(500).json({
      message: "Error fetching jobs",
      error: errorMesssage
    });
  }
};

export default handler;
