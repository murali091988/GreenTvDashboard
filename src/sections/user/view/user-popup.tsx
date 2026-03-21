import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Modal,
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

type UserPopupProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
};

const UserPopup: React.FC<UserPopupProps> = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Admin",
    status: "Active",
    instagram: "",
    facebook: "",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  const handleSave = () => {
    const finalData = {
      ...form,
      profileImage,
    };
    onSave(finalData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 700,
          maxHeight: "90vh",        // ✅ scroll limit
          overflowY: "auto",        // ✅ enable scroll
          bgcolor: "#fff",
          mx: "auto",
          mt: "5%",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 🔥 Sticky Header */}
        <Box
          position="sticky"
          top={0}
          bgcolor="#fff"
          zIndex={1}
          p={3}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="bold">
              Add New User
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mt: 2 }} />
        </Box>

        {/* 🔥 Scrollable Content */}
        <Box p={3}>
          {/* Row 1 */}
          <Box display="flex" gap={2} flexWrap="wrap">
            <Box flex={1} minWidth={250}>
              <Typography>Name *</Typography>
              <TextField
                fullWidth
                placeholder="Enter full name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Box>

            <Box flex={1} minWidth={250}>
              <Typography>Email *</Typography>
              <TextField
                fullWidth
                placeholder="Enter email address"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Box>
          </Box>

          {/* Row 2 */}
          <Box display="flex" gap={2} mt={3} flexWrap="wrap">
            <Box flex={1} minWidth={250}>
              <Typography>Role *</Typography>
              <TextField
                select
                fullWidth
                value={form.role}
                onChange={(e) => handleChange("role", e.target.value)}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </TextField>
            </Box>

            <Box flex={1} minWidth={250}>
              <Typography>Status *</Typography>
              <TextField
                select
                fullWidth
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Box>
          </Box>

          {/* 🔥 Profile Upload */}
          <Box mt={3}>
            <Typography mb={1}>Profile Picture</Typography>

            <Box display="flex" alignItems="center" gap={2}>
              <Box
                component="img"
                src={
                  profileImage ||
                  "https://via.placeholder.com/80?text=Avatar"
                }
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid #ddd",
                }}
              />

              <Button variant="outlined" component="label">
                Upload Image
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>

              {profileImage && (
                <Button color="error" onClick={handleRemoveImage}>
                  Remove
                </Button>
              )}
            </Box>
          </Box>

          {/* Social Section */}
          <Typography mt={4} mb={1} fontWeight="bold">
            Social Media Links
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Box display="flex" gap={2} flexWrap="wrap">
            <Box flex={1} minWidth={250}>
              <Typography>Instagram</Typography>
              <TextField
                fullWidth
                value={form.instagram}
                onChange={(e) =>
                  handleChange("instagram", e.target.value)
                }
              />
            </Box>

            <Box flex={1} minWidth={250}>
              <Typography>Facebook</Typography>
              <TextField
                fullWidth
                value={form.facebook}
                onChange={(e) =>
                  handleChange("facebook", e.target.value)
                }
              />
            </Box>
          </Box>
        </Box>

        {/* 🔥 Sticky Footer */}
        <Box
          position="sticky"
          bottom={0}
          bgcolor="#fff"
          p={3}
          borderTop="1px solid #eee"
          display="flex"
          justifyContent="flex-end"
          gap={2}
        >
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserPopup;