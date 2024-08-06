import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn.mixture import GaussianMixture
from sklearn.preprocessing import StandardScaler

# Generate synthetic data
n_samples = 300
n_features = 2
n_clusters = 3
X, true_labels = make_blobs(n_samples=n_samples, n_features=n_features, centers=n_clusters, cluster_std=1.0, random_state=42)

# Inject some red and blue points into the green cluster
n_extra_points = 30  # Number of points to be mixed into the green cluster
extra_X, _ = make_blobs(n_samples=n_extra_points, n_features=n_features, centers=2, cluster_std=0.5, random_state=43)
green_cluster_index = 2
X[:n_extra_points, :] = extra_X
true_labels[:n_extra_points] = green_cluster_index

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# K-Means Clustering
kmeans = KMeans(n_clusters=n_clusters, random_state=42)
kmeans_labels = kmeans.fit_predict(X_scaled)
kmeans_centroids = kmeans.cluster_centers_

# GMM Clustering
gmm = GaussianMixture(n_components=n_clusters, random_state=42)
gmm_labels = gmm.fit_predict(X_scaled)

# Plot K-Means
plt.figure(figsize=(14, 6))

plt.subplot(1, 2, 1)
plt.scatter(X_scaled[:, 0], X_scaled[:, 1], c=kmeans_labels, cmap='viridis', marker='o', label='Clusters')
plt.scatter(kmeans_centroids[:, 0], kmeans_centroids[:, 1], c='black', s=200, marker='x', label='Centroids')
plt.title('K-Means Clustering')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.legend()

# Plot GMM with Mixed Points
plt.subplot(1, 2, 2)
plt.scatter(X_scaled[gmm_labels == 0, 0], X_scaled[gmm_labels == 0, 1], c='red', marker='o', label='Cluster 1')
plt.scatter(X_scaled[gmm_labels == 1, 0], X_scaled[gmm_labels == 1, 1], c='blue', marker='o', label='Cluster 2')
plt.scatter(X_scaled[gmm_labels == 2, 0], X_scaled[gmm_labels == 2, 1], c='green', marker='o', label='Cluster 3')
plt.title('GMM Clustering with Mixed Points')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.legend()

plt.tight_layout()
plt.show()
