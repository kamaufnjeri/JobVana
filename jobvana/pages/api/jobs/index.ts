// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { JobResponseProps } from "@/interfaces";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseDataProps = {
  message: string;
  error?: string;
  jobs?: JobResponseProps;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataProps>
) => {
  try {
    // get jobs
    const response = await api.get('jobs')
    if (response.status === 200) {
        res.status(200).json({
            message: "Jobs fetched successfully",
            jobs: response.data.data,
          });
    }
  } catch (error) {
    const errorMesssage = handleApiError(error);
    res.status(500).json({
      message: "Error fetching jobs",
      error: errorMesssage,
    });
  }
};

export default handler;
