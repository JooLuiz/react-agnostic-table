interface SearchComponentProps {
    headers: Record<string, string>;
    validSearchableHeaders: string[];
    searchTerm: string;
    searchKey: string;
    onSearchChange: (term: string, key: string) => void;
}