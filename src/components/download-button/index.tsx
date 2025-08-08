import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import api from "@/lib/axios"

const DownloadButton = ({ url: dd, ...params }: any) => {
    const handleDownloadFiles = useCallback(async () => {
        try {
            const response = await api.get(dd, {
                responseType: 'blob', // Important for binary files
                onDownloadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total || 1)
                    );
                    console.log(`Download progress: ${percentCompleted}%`);
                    // Update progress bar in your UI if needed
                },
            });

            // 2. Create a download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            // 3. Set the filename from Content-Disposition header or use the passed filename
            const contentDisposition = response.headers['content-disposition'];
            let downloadFilename = url;

            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
                if (filenameMatch && filenameMatch[1]) {
                    downloadFilename = filenameMatch[1];
                }
            }

            link.setAttribute('download', downloadFilename);

            // 4. Trigger the download
            document.body.appendChild(link);
            link.click();

            // 5. Clean up
            link.remove();
            window.URL.revokeObjectURL(url);

            return true;
        } catch (error) {
            console.log(error)
        }
    }, [dd])
    return <Button {...params} onClick={handleDownloadFiles}>Download Files</Button>
}

export default DownloadButton