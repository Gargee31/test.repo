import csv
import random

# Sample IP addresses for each location
chennai_ips = [
    "192.168.1.1", "192.168.1.2", "192.168.1.3", "192.168.1.4", "192.168.1.5"
]
mahabalipuram_ips = [
    "10.0.0.1", "10.0.0.2", "10.0.0.3", "10.0.0.4", "10.0.0.5"
]
pondicherry_ips = [
    "172.16.0.1", "172.16.0.2", "172.16.0.3", "172.16.0.4", "172.16.0.5"
]

# Combine all IPs into one list with associated locations
data = [
    {"IP": ip, "Location": "Chennai"} for ip in chennai_ips
] + [
    {"IP": ip, "Location": "Mahabalipuram"} for ip in mahabalipuram_ips
] + [
    {"IP": ip, "Location": "Pondicherry"} for ip in pondicherry_ips
]

# Shuffle the data to mix the locations
random.shuffle(data)

# Write the data to a CSV file
csv_file = "ip_addresses.csv"
with open(csv_file, mode='w', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=["IP", "Location"])
    writer.writeheader()
    writer.writerows(data)

print(f"CSV file '{csv_file}' created successfully!")
