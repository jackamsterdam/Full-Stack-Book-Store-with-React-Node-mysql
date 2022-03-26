import { Button, TextField, Typography } from "@material-ui/core";
import { Clear, Send } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BookModel from "../../../Models/BookModel";
import GenreModel from "../../../Models/GenreModel";
import booksService from "../../../Services/BooksService";
import notify from "../../../Services/NotifyService";
import "./AddBook.css";

function AddBook(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<BookModel>()
    const navigate = useNavigate()
    const [genres, setGenres] = useState<GenreModel[]>([])  //[{},{}]

    useEffect(() => {
        (async function () {
            try {
                const genres = await booksService.getAllGenres()
                setGenres(genres)
            } catch (err: any) {
                notify.error(err)
            }
        })()

    }, [])

    async function submit(book: BookModel): Promise<void> {
        try {
            await booksService.addBook(book)

            notify.success('Book has been added')
            navigate('/book-list')
        } catch (err: any) {
            notify.error(err)
        }
    }



    return (
        <div className="AddBook Box">
            <form onSubmit={handleSubmit(submit)}>
                <h1>Add Book</h1>

                <label>Genre:</label>
                <select defaultValue='' {...register('genreId', {
                    required: { value: true, message: 'Missing genre' }
                })}>
                    <option value="" disabled>Get Genres</option>
                    {genres.map(g => <option key={g.genreId} value={g.genreId}>{g.genreName}</option>)}
                </select>
                <span>{formState.errors?.genreId?.message}</span>

                <label>Book Name:</label>
                <input type="text" {...register('bookName', {
                    required: { value: true, message: 'Missing book name' }
                })} />
                <span>{formState.errors?.bookName?.message}</span>


                <label>Description:</label>
                <input type="text" {...register('description', {
                    required: { value: true, message: 'Missing description' }
                })} />
                <span>{formState.errors?.description?.message}</span>


                <label>Price:</label>
                <input type="number" step="0.01" {...register('price', {
                    required: { value: true, message: 'Missing price' },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 1000, message: "Price can't exceed 1000" }
                })} />
                <span>{formState.errors?.price?.message}</span>
                {/* dont put step on stock!!  */}

                <label>Stock:</label>
                <input type="number"  {...register('stock', {
                    required: { value: true, message: 'Missing stock' },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 1000, message: "Price can't exceed 10,000" }
                })} />
                <span>{formState.errors?.stock?.message}</span>

                <button>Add</button>
                {/* <Button startIcon={<Send/>} variant="contained" color="primary">Add</Button> */}
            </form>

        </div>
    );
}

export default AddBook







{/* <div className="AddBook Box">
<form onSubmit={handleSubmit(submit)}>
    <Typography variant="h5">Add Book</Typography>

    <label>Genre:</label>
    <select defaultValue='' {...register('genreId', {
        required: {value: true, message: 'Missing genre'}
    })}>
        <option value="" disabled>Get Genres</option>
        {genres.map(g => <option key={g.genreId} value={g.genreId}>{g.genreName}</option>)}
    </select>
    <Typography className="spanner">{formState.errors?.genreId?.message}</Typography>

    
    <TextField className="TextBox" variant="outlined" label="Book Name:" type="text" {...register('bookName', {
        required: {value: true, message: 'Missing book name'}
    })}/>
    <Typography className="spanner">{formState.errors?.bookName?.message}</Typography>

    
    <TextField className="TextBox"  variant="outlined" label="Description:" type="text" {...register('description', {
        required: {value: true, message: 'Missing description'}
    })}/>
    <Typography className="spanner">{formState.errors?.description?.message}</Typography>


    <TextField className="TextBox"   variant="outlined"label="Price:" type="number"  inputProps={{ step: ".01" }} {...register('price', {
        required: {value: true, message: 'Missing price'},
        min: {value: 0, message: "Price can't be negative"},
        max: {value: 1000, message: "Price can't exceed 1000"}
    })}/>
    <Typography className="spanner">{formState.errors?.price?.message}</Typography>


    <TextField className="TextBox"  variant="outlined" label="Stock" type="number" inputProps={{ step: ".01" }}{...register('stock', {
        required: {value: true, message: 'Missing stock'},
        min: {value: 0, message: "Price can't be negative"},
        max: {value: 1000, message: "Price can't exceed 10,000"}
    })} />
    <Typography className="spanner">{formState.errors?.stock?.message}</Typography>


    <Button startIcon={<Clear/>}   type="submit" variant="contained"fullWidth color="primary" >Add</Button>
</form>

</div> */}