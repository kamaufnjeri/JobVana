// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "js-cookie";

type Data = {
  data?: any;
  error?: string;
  accessToken?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    // Fetching the saved jobs from your API
    const response = await api.get("jobs/saved_jobs");

    // Check if the response status is successful
    if (response.status === 200) {
      return res.status(200).json({ data: response.data });
    }

    // If the API response is not successful, handle it gracefully
    return res.status(response.status).json({
      error: `Failed to fetch saved jobs. Status code: ${response.status}`,
    });
  } catch (error: any) {
    // Handle any errors that might have occurred during the fetch
    console.error("Error fetching saved jobs:",error);

    const errorMessage =  handleApiError(error)

    // Return a generic error message to the client
    return res.status(500).json({
      error: errorMessage,
      accessToken: Cookies.get('accessToken')
    });
  }
};

export default handler;
