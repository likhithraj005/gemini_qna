package com.ai.gemini_chat;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.Map;

@Service
public class QnAService {

    @Value("${gemini.api.url}")
    private String geminiAPIUrl;

    @Value("${gemini.api.key}")
    private String geminiAPIKey;

    private final WebClient webClient;

    public QnAService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String getAnswer(String question) {
        try {
            // Construct the request payload
            Map<String, Object> requestBody = Map.of(
                    "contents", new Object[]{
                            Map.of("parts", new Object[]{
                                    Map.of("text", question)
                            })
                    }
            );

            // Make API call
            return webClient.post()
                    .uri(geminiAPIUrl)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (WebClientResponseException e) {
            // Log error for debugging
            System.err.println("Error Response: " + e.getResponseBodyAsString());
            e.printStackTrace();
            return "Failed to fetch the answer. Error: " + e.getMessage();
        } catch (Exception e) {
            e.printStackTrace();
            return "An unexpected error occurred.";
        }
    }
}
