import React, { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Card,
  Grid,
  Chip,
  Button,
  Select,
  MenuItem,
  TextField,
  CardMedia,
  Typography,
  IconButton,
  InputLabel,
  CardContent,
  FormControl,
} from "@mui/material";

// 🎯 Dummy Data
const videos = [
  {
    id: 1,
    type: "video",
    title: "AI Future Trends",
    category: "Technology",
    menu: "Podcast",
    thumbnail: "https://picsum.photos/300/180",
    duration: "10:30",
  },
  {
    id: 2,
    type: "audio",
    title: "Startup Podcast Episode",
    category: "Business",
    menu: "Podcast",
    audioUrl: "https://www.w3schools.com/html/horse.mp3",
    duration: "15:20",
  },
];

export default function ManageVideos() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Manage Media 🎬🎵
      </Typography>

      {/* 🔍 Search + Filter */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          fullWidth
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 📦 Grid */}
      <Grid container spacing={3}>
        {filteredVideos.map((video) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={video.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
              
              {/* 🎬 VIDEO */}
              {video.type === "video" ? (
                <CardMedia
                  component="img"
                  height="180"
                  image={video.thumbnail}
                />
              ) : (
                /* 🎵 AUDIO */
                <Box
                  sx={{
                    height: 180,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f3f4f6",
                  }}
                >
                  <audio controls style={{ width: "90%" }}>
                    <source src={video.audioUrl} />
                  </audio>
                </Box>
              )}

              <CardContent>
                <Typography fontWeight="bold">
                  {video.title}
                </Typography>

                {/* 🏷 Chips */}
                <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                  <Chip label={video.category} size="small" />
                  <Chip label={video.menu} size="small" />
                  <Chip
                    label={video.type === "video" ? "Video 🎬" : "Audio 🎵"}
                    size="small"
                    color={video.type === "video" ? "primary" : "secondary"}
                  />
                </Box>

                <Typography variant="caption" display="block" mt={1}>
                  Duration: {video.duration}
                </Typography>

                {/* Actions */}
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button
                    startIcon={<EditIcon />}
                    size="small"
                    variant="outlined"
                  >
                    Edit
                  </Button>

                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}