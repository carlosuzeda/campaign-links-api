import { Router } from "express";

import { registerRoute } from "./auth/register";
import { loginRoute } from "./auth/login";

import { createProjectRoute } from "./projects/create-project";
import { listProjectsRoute } from "./projects/list-projects";
import { getProjectRoute } from "./projects/get-project";
import { deleteProjectRoute } from "./projects/delete-project";

import { createLinkRoute } from "./links/create-link";
import { listLinksRoute } from "./links/list-links";
import { updateLinkRoute } from "./links/update-link";
import { deleteLinkRoute } from "./links/delete-link";
import { generateLinkRoute } from "./links/generate-link";

import { createParameterRoute } from "./parameters/create-parameter";
import { listParametersRoute } from "./parameters/list-parameters";
import { attachParameterRoute } from "./parameters/attach-parameter";
import { detachParameterRoute } from "./parameters/detach-parameter";

import { setRedirectRoute } from "./redirect/set-redirect";
import { removeRedirectRoute } from "./redirect/remove-redirect";

export const routes = Router();

// Auth
routes.use("/auth", registerRoute);
routes.use("/auth", loginRoute);

// Projects
routes.use("/projects", createProjectRoute);
routes.use("/projects", listProjectsRoute);
routes.use("/projects", getProjectRoute);
routes.use("/projects", deleteProjectRoute);

// Links
routes.use("/", createLinkRoute);
routes.use("/", listLinksRoute);
routes.use("/", updateLinkRoute);
routes.use("/", deleteLinkRoute);
routes.use("/", generateLinkRoute);

// Parameters
routes.use("/", createParameterRoute);
routes.use("/", listParametersRoute);
routes.use("/", attachParameterRoute);
routes.use("/", detachParameterRoute);

// Redirect
routes.use("/", setRedirectRoute);
routes.use("/", removeRedirectRoute);
