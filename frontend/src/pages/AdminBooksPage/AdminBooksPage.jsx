import React, { useState } from "react";
import Table from "@mui/joy/Table";
import { Button, Dialog, DialogContent, Pagination } from "@mui/material";
import { Delete } from "@mui/icons-material";
import ViewUserComp from "../../components/ViewUserComp/ViewUserComp";
import DeleteUserComp from "../../components/DeleteUserComp/DeleteUserComp";
import SearchComp from "../../components/SearchComp/SearchComp";
import { useQuery } from "react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ITEMS_PER_PAGE = 5;

// Fetch books data
const fetchBooks = async () => {
  const { data } = await axios.get(
    "https://booknest-server-blue.vercel.app/api/v1/booknest/book/getBooks"
  );
  return data.books;
};

export default function AdminBooksPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const { data: books = [], isLoading, isError, refetch } = useQuery(
    "books",
    fetchBooks,
    { staleTime: 300000 } // Cache data for 5 minutes
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = searchResults.length > 0 ? searchResults.slice(startIndex, endIndex) : books.slice(startIndex, endIndex);

  const handleOpenDialog = (bookId) => {
    setSelectedBookId(bookId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = async (query) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4040/api/v1/booknest/book/searchBooks/?query=${query}`
    
      );

      setSearchResults(data);
      if(data.length==0)
        toast.error("Book Not Found")
      
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  const onDeleteBook = (deletedBookId) => {
    // Implement deletion logic if needed
  };

  return (
    <div className="admin-home">
      <ToastContainer/>
      <SearchComp onSearch={handleSearch} suggestions={books.map((book) => book.bookName)} />
      <div className="user-table">
        <Table hoverRow>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Genre</th>
              <th style={{ width: "20%" }}>Actions</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "white", cursor: "pointer" }}>
            {currentData.map((row, index) => (
              <tr key={row._id}>
                <td>{index + 1}</td>
                <td>{row.bookName}</td>
                <td>{row.author}</td>
                <td>{row.publisher}</td>
                <td>{row.genre}</td>
                <td>
                  <div className="action-buttons">
                    <Button variant="contained" onClick={() => handleOpenDialog(row._id)}>
                      View Book
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      style={{ marginLeft: 6 }}
                      onClick={() => setIsDeleteDialogOpen(true)}
                    >
                      <Delete />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogContent>
            {selectedBookId && <ViewUserComp userId={selectedBookId} />}
          </DialogContent>
        </Dialog>
        <div className="pagination">
          <Pagination
            count={Math.ceil(currentData.length / ITEMS_PER_PAGE)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
        {isDeleteDialogOpen && (
          <DeleteUserComp
            userId={selectedBookId}
            open={isDeleteDialogOpen}
            handleClose={() => setIsDeleteDialogOpen(false)}
            onDeleteUser={onDeleteBook}
          />
        )}
      </div>
    </div>
  );
}
