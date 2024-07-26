# test.repo
demonstration
import re
from collections import Counter
from math import log

# Define suspicious phrases and keywords
suspicious_phrases = [
    "send me your password", "what's your OTP", "give me your account number",
    "verify your social security number", "transfer money", "click on the link",
    "urgent action required", "confirm your identity", "verify your details",
    "update your account", "security alert", "sensitive information"
]

suspicious_keywords = [
    "password", "OTP", "account", "social security", "transfer", 
    "click", "link", "urgent", "verify", "confirm", "update", "security", "sensitive"
]

# Preprocess text: normalize case and remove special characters
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'\s+', ' ', text)  # Remove extra whitespace
    text = re.sub(r'[^a-z0-9\s]', '', text)  # Remove special characters
    return text

# Extract keywords using Counter
def extract_keywords(text):
    words = re.findall(r'\b\w+\b', text)
    keywords = [word for word in words if word in suspicious_keywords]
    return Counter(keywords)

# Compute TF-IDF scores for the keywords
def compute_tfidf(text, keyword_counts):
    total_words = len(re.findall(r'\b\w+\b', text))
    tfidf_scores = {}
    for keyword, count in keyword_counts.items():
        tf = count / total_words
        idf = log((total_words + 1) / (count + 1)) + 1
        tfidf_scores[keyword] = tf * idf
    return tfidf_scores

# Detect suspicious phrases and keywords
def detect_suspicious_content(text):
    alerts = []
    preprocessed_text = preprocess_text(text)
    
    for phrase in suspicious_phrases:
        if phrase in preprocessed_text:
            alerts.append(f"Phrase match: {phrase}")
    
    keyword_counts = extract_keywords(preprocessed_text)
    tfidf_scores = compute_tfidf(preprocessed_text, keyword_counts)
    for keyword, score in tfidf_scores.items():
        if score > 0.05:  # Arbitrary threshold for suspicious keyword importance
            alerts.append(f"Keyword match: {keyword} (TF-IDF score: {score:.2f})")
    
    return alerts

# Enhanced sentiment analysis
def sentiment_analysis(text):
    urgency_phrases = ["urgent", "immediately", "asap", "right away", "important", "do it now"]
    coercion_phrases = ["must", "need", "have to", "required", "failure to comply"]
    
    urgent = any(phrase in text for phrase in urgency_phrases)
    coercive = any(phrase in text for phrase in coercion_phrases)
    
    sentiment_flags = []
    if urgent:
        sentiment_flags.append("Urgency detected")
    if coercive:
        sentiment_flags.append("Coercion detected")
    
    return sentiment_flags

# Detect suspicious entities (emails, URLs, phone numbers)
def detect_suspicious_entities(text):
    entities = []
    emails = re.findall(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text)
    urls = re.findall(r'(https?://\S+)', text)
    phones = re.findall(r'\b\d{10,}\b', text)  # Basic pattern for phone numbers
    
    if emails:
        entities.append(f"Email addresses detected: {emails}")
    if urls:
        entities.append(f"URLs detected: {urls}")
    if phones:
        entities.append(f"Phone numbers detected: {phones}")
    
    return entities

# Main function to integrate all features
if __name__ == "__main__":
    # Simulated input text
    input_text = """
    Hi, this is your bank calling. We need you to verify your account number.
    Please send me your password to confirm your identity immediately.
    This is urgent, and failure to comply will result in account suspension.
    For more details, visit https://suspiciouswebsite.com or call 1234567890.
    """
    
    print(f"Input text: {input_text}")  # Debugging print statement
    
    # Detect suspicious content
    suspicious_content = detect_suspicious_content(input_text)
    sentiment_flags = sentiment_analysis(input_text)
    suspicious_entities = detect_suspicious_entities(input_text)

    if suspicious_content or sentiment_flags or suspicious_entities:
        print("Suspicious content detected:")
        for alert in suspicious_content:
            print(f"- {alert}")
        for flag in sentiment_flags:
            print(f"- {flag}")
        for entity in suspicious_entities:
            print(f"- {entity}")
    else:
        print("No suspicious content detected.")
