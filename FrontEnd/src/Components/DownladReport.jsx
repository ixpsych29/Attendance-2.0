import convertArrayToCSV from "convert-array-to-csv";
import toast from "react-hot-toast";

const DownloadCSVReport = async (reportData, reportType) => {
  try {
    if (!reportData || reportData.length === 0) {
      toast.error(`No records found for ${reportType} report`);
      return;
    }

    // Gather all unique keys from the data
    const allKeys = new Set();
    reportData.forEach((record) => {
      Object.keys(record).forEach((key) => allKeys.add(key));
    });

    // Convert the set to an array for easier processing
    const keysArray = Array.from(allKeys);

    // Extract relevant data for CSV and ensure all fields are included
    const csvData = reportData.map((record) => {
      const formattedRecord = {};
      keysArray.forEach((key) => {
        formattedRecord[key] = record[key] || "";
      });
      return formattedRecord;
    });

    // Convert array to CSV
    const csvContent = convertArrayToCSV(csvData, {
      header: keysArray,
    });

    // Set the file name based on the report type
    const fileName = `attendance_report_${reportType}.csv`;

    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Append the link to the body and trigger the download
    document.body.appendChild(link);
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);

    // Notify user
    toast.success(`CSV report (${reportType}) generated successfully!`);
  } catch (error) {
    console.error("Error generating CSV report", error);
  }
};

export default DownloadCSVReport;
