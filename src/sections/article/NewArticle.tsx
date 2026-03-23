import React, { useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Card,
    Chip,
    Button,
    Dialog,
    Select,
    MenuItem,
    TextField,
    Typography,
    IconButton,
    CardContent,
    FormControl,
    InputLabel,
    DialogTitle,
    DialogContent,
} from "@mui/material";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function NewArticleModal({ open, onClose }: Props) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<string | null>(null);

    const fileRef = useRef<HTMLInputElement | null>(null);

    const handleAddTag = () => {
        if (!tagInput) return;
        setTags([...tags, tagInput]);
        setTagInput("");
    };

    const handleDeleteTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handleImage = (file?: File) => {
        if (!file || !file.type.startsWith("image/")) return;
        setImage(URL.createObjectURL(file));
    };

    const handlePublish = () => {
        const data = { title, category, tags, content };
        console.log("Publish:", data);

        // reset form
        setTitle("");
        setCategory("");
        setTags([]);
        setContent("");
        setImage(null);

        onClose(); // close popup
    };

    const handleSaveDraft = () => {
        const data = { title, category, tags, content };
        console.log("Publish:", data);

        // reset form
        setTitle("");
        setCategory("");
        setTags([]);
        setContent("");
        setImage(null);

        onClose(); // close popup
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            {/* Header */}
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
                Create New Article 📝
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            {/* Content */}
            <DialogContent dividers>
                <Card sx={{ borderRadius: 3, boxShadow: 0 }}>
                    <CardContent>

                        {/* TITLE */}
                        <TextField
                            fullWidth
                            label="Article Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{ mb: 3 }}
                        />

                        {/* SUB - TITLE */}
                        <TextField
                            fullWidth
                            label="Sub Article Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{ mb: 3 }}
                        />

                        {/* CATEGORY */}
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={category}
                                label="Category"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <MenuItem value="Technology">Technology</MenuItem>
                                <MenuItem value="Business">Business</MenuItem>
                                <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                            </Select>
                        </FormControl>

                        {/* TAGS */}
                        {/* <Box mb={3}>
              <Typography mb={1}>Tags</Typography>

              <Box display="flex" gap={1}>
                <TextField
                  fullWidth
                  placeholder="Add tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                />
                <Button variant="contained" onClick={handleAddTag}>
                  Add
                </Button>
              </Box>

              <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleDeleteTag(tag)}
                  />
                ))}
              </Box>
            </Box> */}

                        {/* IMAGE */}
                        <Box mb={3}>
                            <Typography mb={1}>Cover Image</Typography>

                            <Box
                                onClick={() => fileRef.current?.click()}
                                sx={{
                                    border: "2px dashed #5cb039",
                                    borderRadius: 2,
                                    p: 3,
                                    textAlign: "center",
                                    cursor: "pointer",
                                }}
                            >
                                {!image ? (
                                    "Click to upload image"
                                ) : (
                                    <img
                                        src={image}
                                        alt="cover"
                                        style={{ width: "100%", borderRadius: 8 }}
                                    />
                                )}
                            </Box>

                            <input
                                ref={fileRef}
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(e) => handleImage(e.target.files?.[0])}
                            />
                        </Box>

                        {/* CONTENT */}
                        <TextField
                            fullWidth
                            label="Content"
                            multiline
                            rows={6}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            sx={{ mb: 3 }}
                        />

                        {/* ACTIONS */}
                        <Box display="flex" gap={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handlePublish}
                            >
                                Publish
                            </Button>

                            <Button
                                variant="outlined"
                                color="warning"
                                fullWidth
                                onClick={handleSaveDraft}
                            >
                                Save Draft
                            </Button>

                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                        </Box>

                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}