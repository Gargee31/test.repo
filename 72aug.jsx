from sklearn.metrics import silhouette_score

# Elbow method for K-Means
sse = []
for k in range(1, 11):
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X_scaled)
    sse.append(kmeans.inertia_)

plt.figure(figsize=(8, 4))
plt.plot(range(1, 11), sse, marker='o')
plt.title('Elbow Method for Optimal k')
plt.xlabel('Number of clusters')
plt.ylabel('Sum of squared distances')
plt.show()


# Silhouette score for different numbers of clusters
silhouette_scores = []
for k in range(2, 11):
    kmeans = KMeans(n_clusters=k, random_state=42)
    labels = kmeans.fit_predict(X_scaled)
    silhouette_scores.append(silhouette_score(X_scaled, labels))

plt.figure(figsize=(8, 4))
plt.plot(range(2, 11), silhouette_scores, marker='o')
plt.title('Silhouette Score for Different k')
plt.xlabel('Number of clusters')
plt.ylabel('Silhouette Score')
plt.show()

from matplotlib.patches import Ellipse

def plot_gmm_covariances(gmm, X, ax):
    for pos, covar, w in zip(gmm.means_, gmm.covariances_, gmm.weights_):
        draw_ellipse(pos, covar, alpha=w, ax=ax)

def draw_ellipse(position, covariance, ax=None, **kwargs):
    ax = ax or plt.gca()
    if covariance.shape == (2, 2):
        U, s, Vt = np.linalg.svd(covariance)
        angle = np.degrees(np.arctan2(U[1, 0], U[0, 0]))
        width, height = 2 * np.sqrt(s)
    else:
        angle = 0
        width, height = 2 * np.sqrt(covariance)
    for nsig in range(1, 4):
        ax.add_patch(Ellipse(position, nsig * width, nsig * height, angle, **kwargs))

# Plot GMM with Covariance Ellipses
plt.figure(figsize=(8, 6))
ax = plt.gca()
plt.scatter(X_scaled[:, 0], X_scaled[:, 1], c=gmm_labels, cmap='viridis', s=40)
plot_gmm_covariances(gmm, X_scaled, ax)
plt.title('GMM Clustering with Covariance Ellipses')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.show()


import seaborn as sns
import pandas as pd

# Convert to DataFrame for pair plot
df = pd.DataFrame(X_scaled, columns=['Feature 1', 'Feature 2'])
df['Cluster'] = gmm_labels

# Pair plot
sns.pairplot(df, hue='Cluster', palette='viridis')
plt.suptitle('Pair Plot of Features Colored by Cluster', y=1.02)
plt.show()



from mpl_toolkits.mplot3d import Axes3D

# Generate synthetic data with 3 features
X_3d, _ = make_blobs(n_samples=n_samples, n_features=3, centers=n_clusters, cluster_std=1.0, random_state=42)
X_3d_scaled = scaler.fit_transform(X_3d)

# K-Means Clustering for 3D data
kmeans_3d = KMeans(n_clusters=n_clusters, random_state=42)
kmeans_labels_3d = kmeans_3d.fit_predict(X_3d_scaled)

# 3D plot
fig = plt.figure(figsize=(8, 6))
ax = fig.add_subplot(111, projection='3d')
ax.scatter(X_3d_scaled[:, 0], X_3d_scaled[:, 1], X_3d_scaled[:, 2], c=kmeans_labels_3d, cmap='viridis', marker='o')
ax.set_title('3D K-Means Clustering')
ax.set_xlabel('Feature 1')
ax.set_ylabel('Feature 2')
ax.set_zlabel('Feature 3')
plt.show()
