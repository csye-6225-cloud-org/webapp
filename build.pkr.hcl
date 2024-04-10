variable "gcp_service_acc_key" {
  type    = string
  default = "${env("GCP_SECURITY_CREDENTIALS")}"
}

variable "gcp_project_id" {
  type    = string
  default = "csye-6225-project-dev"
}

variable "source_image_family" {
  type    = string
  default = "centos-stream-8"
}

variable "ssh_username" {
  type    = string
  default = "pkr-gcp-user"
}

variable "gcp_network" {
  type    = string
  default = "default"
}

variable "gcp_region" {
  type    = string
  default = "us-east1"
}

variable "gcp_zone" {
  type    = string
  default = "us-east1-b"
}

packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1, <2"
    }
  }
}

source "googlecompute" "packer-image" {
  image_name          = "csye-6225-image-{{timestamp}}"
  project_id          = var.gcp_project_id
  source_image_family = var.source_image_family
  ssh_username        = var.ssh_username
  credentials_json = file("gcp-creds.json")
  network          = var.gcp_network
  region           = var.gcp_region
  zone             = var.gcp_zone
}

build {
  sources = ["sources.googlecompute.packer-image"]
  provisioner "file" {
    source      = "webapp.zip"
    destination = "~/"
  }
  provisioner "shell" {
    inline = [
      "cd ~"
    ]
  }
  provisioner "shell" {
    scripts = [
      "./build.sh",
    ]
  }
  post-processor "manifest" {
    output     = "manifest.json"
    strip_path = true
  }
}
