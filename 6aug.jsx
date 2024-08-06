import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.mixture import GaussianMixture
from sklearn.decomposition import PCA
from sklearn.datasets import make_blobs

# Generate synthetic data
n_samples = 1000
n_features = 4  # Four octets of IP addresses
n_clusters = 4  # Number of clusters for demonstration

# Create synthetic data with blobs
X, _ = make_blobs(n_samples=n_samples, n_features=n_features, centers=n_clusters, cluster_std=0.60, random_state=0)

# Apply PCA for 2D visualization
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

# K-Means clustering
kmeans = KMeans(n_clusters=n_clusters, random_state=0)
kmeans_labels = kmeans.fit_predict(X)
kmeans_centers = kmeans.cluster_centers_

# GMM clustering
gmm = GaussianMixture(n_components=n_clusters, random_state=0)
gmm_labels = gmm.fit_predict(X)
gmm_probs = gmm.score_samples(X)
gmm_scores = np.exp(gmm_probs)  # Convert log-likelihood to density

# Find outliers based on GMM density
threshold = np.percentile(gmm_scores, 4)  # 4% percentile as threshold for outliers
outliers = gmm_scores < threshold

# Plot K-Means clustering
plt.figure(figsize=(12, 6))

plt.subplot(1, 2, 1)
plt.scatter(X_pca[:, 0], X_pca[:, 1], c=kmeans_labels, cmap='viridis', marker='o', s=50, alpha=0.7)
plt.scatter(kmeans_centers[:, 0], kmeans_centers[:, 1], c='red', marker='x', s=100, label='Centroids')
plt.title('K-Means Clustering')
plt.xlabel('PCA Component 1')
plt.ylabel('PCA Component 2')
plt.legend()

# Plot GMM clustering and outliers
plt.subplot(1, 2, 2)
plt.scatter(X_pca[:, 0], X_pca[:, 1], c=gmm_labels, cmap='viridis', marker='o', s=50, alpha=0.7)
plt.scatter(X_pca[outliers, 0], X_pca[outliers, 1], c='red', marker='x', s=100, label='Outliers')
plt.title('GMM Clustering with Outliers')
plt.xlabel('PCA Component 1')
plt.ylabel('PCA Component 2')
plt.legend()

plt.tight_layout()
plt.show()
