import { useState } from "react";
import { Stack } from "@mui/material";
import Button from "@/components/Button";
import { AuthScreenPaper } from "@/components/Paper";
import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import { MovierMediaEnum } from "@/types/enum";
import { extractVideoMetadata, extractVideoUrl } from "metalyzer";
import { useGetUploadVideoSignedUrl } from "../hooks/queryHooks";
import EpisodeUploadModal from "../components/EpisodeUploadModal";

export default function EpisodeUploadScreen() {
  const [isEpisodeUploadModalVisible, setIsEpisodeUploadModalVisible] = useState(true);
  const [episodeUrl, setEpisodeUrl] = useState<string | null>(null);
  const { mutateAsync: getUploadEpisodeUrlMutateAsync, isPending } = useGetUploadVideoSignedUrl();

  const handleOnEpisodeDrop = async (episode: File) => {
    const episodeMetadata = await extractVideoMetadata(episode);
    const result = await getUploadEpisodeUrlMutateAsync({
      Height: episodeMetadata.videoHeight!,
      Width: episodeMetadata.videoWidth!,
      MediaType: MovierMediaEnum.MOVIE,
      Mime: episodeMetadata.mimeType,
      RunTime: episodeMetadata.videoDuration,
      SizeInKb: episodeMetadata.fileSizeKB,
    });

    setEpisodeUrl(await extractVideoUrl(episode));
    handleOnToggleEpisodeUploadModal();
  };

  const handleOnToggleEpisodeUploadModal = () => {
    setIsEpisodeUploadModalVisible(!isEpisodeUploadModalVisible);
  };

  return (
    <AuthScreenPaper>
      <Button onClick={handleOnToggleEpisodeUploadModal}>Upload</Button>
      {episodeUrl && (
        <video controls width="100%" height="600">
          <source src={episodeUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <EpisodeUploadModal isVisible={isEpisodeUploadModalVisible} onClose={handleOnToggleEpisodeUploadModal} onEpisodeDrop={handleOnEpisodeDrop} isLoading={isPending} />
      <LayoutAppBar />
      <LayoutAppHeader />
      <LayoutSideBar />
    </AuthScreenPaper>
  );
}
