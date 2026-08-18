import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useFetchData = (url) => {
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(url, {
          withCredentials: true,
        });

        if (res.data.success) {
          setAllData(res.data.data);
        } else {
          toast.error(res.data.message || "Failed to fetch data.");
          console.log(error)
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while fetching data."
        );
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { loading, allData };
};

export default useFetchData;