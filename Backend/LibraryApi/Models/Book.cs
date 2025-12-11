namespace LibraryApi.Models
{
    public class Book
    {
        public int Id { get; set; }               // Primary key
        public string Title { get; set; } = "";   // Book title
        public string Author { get; set; } = "";  // Author name
        public string Description { get; set; } = "";  // Summary
    }
}
