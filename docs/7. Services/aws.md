---
id: s3
title: S3 Backup
slug: /s3
---

# S3 Bucket Backup

The AW3 S3 service takes a backup of the repository daily at 8:30 UTC. The service runs under a container set at `environments/s3.yaml` and its Dockerfile under `services/s3sync/Dockerfile.s3`.

To run the service the environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` must be set under `.env`. The `BUCKET_NAME` is set to `s3://sourcify-backup-s3` by default.

To view the console output of the sync operations open a terminal inside the container

```
docker exec -it s3-${TAG} bash
```

where `${TAG}` is `stable` on production or `latest` on staging and other environments. Check the cron output:

```
cat /var/log/cron.log
```

On the same container you can check the files with the `s3 ls` command:

```
aws s3 ls s3://sourcify-backup-s3/${TAG}/repository/
```

Don't forget to add a trailing slash as `/${TAG}/repository/` not `/${TAG}/repository` to be able to view objects under the folder.

If you have a [named profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) set in your local computer under `~/.aws/credentials`, add the `--profile` flag to the requests:

```
aws s3 ls s3://sourcify-backup-s3/latest/repository/ --profile sourcify
```
