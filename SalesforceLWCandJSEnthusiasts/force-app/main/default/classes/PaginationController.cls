// Apex class to handle data retrieval for pagination
public with sharing class PaginationController {

    // Method to fetch a specific page of Account records
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(Integer pageSize, Integer offset) {
        // SOQL query to retrieve accounts with specified page size and offset
        // Uses bind variables (:pageSize and :offset) to prevent SOQL injection
        List<Account> accounts = [
            SELECT Id, Name, Industry, Rating
            FROM Account
            ORDER BY Name
            LIMIT :pageSize
            OFFSET :offset
        ];
        return accounts;
    }

    // Method to get the total number of Account records
    @AuraEnabled(cacheable=true)
    public static Integer getTotalRecords() {
        // SOQL query to count the total number of Account records
        Integer totalRecords = [SELECT COUNT() FROM Account];
        return totalRecords;
    }
}
