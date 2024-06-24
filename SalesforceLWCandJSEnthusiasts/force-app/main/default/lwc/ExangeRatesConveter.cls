public with sharing class ExangeRatesConveter {
    private static final String BASE_URL = 'https://api.frankfurter.app/latest';
   // private static final String API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key (if required)
    @AuraEnabled
    public static String getExchangeRate(String amount, String fromCurrency, String toCurrency) {
        String responseBody;
        String endpoint = BASE_URL + '?amount=' + amount +
                          '&from=' + fromCurrency +
                          '&to=' + toCurrency;

        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpoint);
        request.setMethod('GET');

        // Set any additional headers or parameters if needed
        // request.setHeader('Authorization', 'Bearer ' + API_KEY);

        Http http = new Http();
        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
             responseBody = response.getBody();
            // Process the response data (e.g., parse JSON)
            System.debug('API Response: ' + responseBody);
        } else {
            System.debug('Error calling Frankfurter API. Status code: ' + response.getStatusCode());
        }
        return responseBody;
    }
}