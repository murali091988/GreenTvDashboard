import React, { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Card,
  Grid,
  Chip,
  Table,
  Button,
  Select,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
  IconButton,
  InputLabel,
  CardContent,
  FormControl,
  TableContainer,
} from "@mui/material";

import NewArticleModal from "../NewArticle";

// 🎯 Dummy Data
const articles = [
  {
    id: 1,
    title: "Future of AI",
    category: "Technology",
    status: "Published",
    date: "2026-03-20",
  },
  {
    id: 2,
    title: "Green Energy Trends",
    category: "Sustainability",
    status: "Draft",
    date: "2026-03-18",
  },
];

export default function ArticleDashboard() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [newArticle, setNewArticle] = useState(false);

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Article Dashboard 📰
      </Typography>

      {/* 📊 STATS */}
      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography>Total Articles</Typography>
              <Typography variant="h4">24</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography>Published</Typography>
              <Typography variant="h4" color="green">
                18
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography>Drafts</Typography>
              <Typography variant="h4" color="orange">
                6
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 🔍 FILTERS */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          fullWidth
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Published">Published</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={() => {setNewArticle(true) }}> New Article</Button>
      </Box>

      {/* 📄 TABLE */}
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article.title}</TableCell>

                <TableCell>
                  <Chip label={article.category} size="small" />
                </TableCell>

                <TableCell>
                  <Chip
                    label={article.status}
                    color={
                      article.status === "Published"
                        ? "success"
                        : "warning"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>{article.date}</TableCell>

                <TableCell>
                  <IconButton>
                    <EditIcon />
                  </IconButton>

                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <NewArticleModal
        open={newArticle}
        onClose={() => setNewArticle(false)}
      />
    </Box>
  );
}