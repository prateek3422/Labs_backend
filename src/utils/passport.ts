import passport from "passport";
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from "passport-google-oauth20";
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from "passport-github2";
import { userRepo } from "@/repositories";
import { HttpError } from "@/api/rest/configs";
import { myEnvironment } from "@/configs";

// Define types for better type safety
interface User {
    id: string;
    email: string;
    name: string;
    LoginType: string;
    isVerified?: boolean;
    password?: string;
    image?: {
        url: string;
        publicId: string;
    };
}

interface GoogleProfileExtended extends GoogleProfile {
    _json: {
        iss: string;
        aud: string;
        iat: number;
        exp: number;
        email?: string;
        name?: string;
        picture?: string;
        email_verified?: boolean;
        sub: string;
        azp?: string;
        at_hash?: string;
        given_name?: string;
        family_name?: string;
        locale?: string;
        hd?: string;
        profile?: string;
    };
}

interface GitHubProfileExtended extends GitHubProfile {
    id: string;
    username: string;
    emails?: { value: string; verified?: boolean }[];
    photos?: { value: string }[];
    _json: {
        login: string;
        id: number;
        avatar_url: string;
        html_url: string;
        email: string | null;
        name: string;
        sub: string;
    }

}

try {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: string, done) => {
        userRepo.getSingleUser({ id })
            .then((user) => {
                if (user) {
                    done(null, user);
                } else {
                    done(new HttpError("User not found", 404), false);
                }
            })
            .catch(() => {
                done(new HttpError("Internal server Error", 500), false);
            });
    });

    //@ts-expect-error  google strategy expects a string for clientID and clientSecret
    passport.use(new GoogleStrategy({
        clientID: myEnvironment.GOOGLE_CLIENT_ID,
        clientSecret: myEnvironment.GOOGLE_CLIENT_SECRET,
        callbackURL: myEnvironment.CALLBACK_URL
    },
        (
            accessToken: string,
            refreshToken: string,
            profile: GoogleProfileExtended,
            done: (error?: Error | null, user?: User | false) => void
        ) => {
            (async () => {
                try {
                    if (!profile?.emails || profile?.emails.length === 0) {
                        return done(new HttpError("Email not found in profile", 400));
                    }

                    const email = profile._json?.email || profile.emails[0]?.value;
                    if (!email) {
                        return done(new HttpError("Email not found in profile", 400));
                    }

                    const isUserExist = await userRepo.getSingleUser({ email });

                    if (isUserExist) {
                        if (isUserExist.LoginType === "google") {
                            return done(null, isUserExist as unknown as User);
                        } else {
                            const loginType = isUserExist.LoginType?.toLowerCase()?.split("_").join(" ");
                            return done(new HttpError(
                                `You have previously registered using ${loginType}. Please use the ${loginType} login option to access your account`,
                                400
                            ));
                        }
                    } else {
                        const newUser = await userRepo.createUser({
                            email: email,
                            name: profile._json?.name || profile.displayName || "",
                            LoginType: "google",
                            isVerified: profile._json?.email_verified,
                            password: profile._json?.sub || "",
                            image: {
                                url: profile._json?.picture || "",
                                publicId: profile._json?.sub || ""
                            }
                        });

                        return newUser ? done(null, newUser as unknown as User) : done(new HttpError("Failed to create user", 500));
                    }
                } catch {
                    return done(new HttpError("Authentication failed", 500));
                }
            })().catch(() => {
                done(new HttpError("Authentication failed", 500));
            });
        }
    ));

    passport.use(new GitHubStrategy({
        clientID: myEnvironment.GITHUB_CLIENT_ID,
        clientSecret: myEnvironment.GITHUB_CLIENT_SECRET,
        callbackURL: myEnvironment.GITHUB_CALLBACK_URL,
    },
        (
            accessToken: string,
            refreshToken: string,
            profile: GitHubProfileExtended,
            done: (error?: Error | null, user?: User | false) => void
        ) => {
            (async () => {
                try {
                    const email = profile?.emails && profile.emails.length > 0 ? profile.emails[0]?.value : undefined;
                    if (!email) {
                        return done(new HttpError("Email not found in GitHub profile", 400));
                    }

                    const user = await userRepo.getSingleUser({ email });

                    if (user) {
                        if (user.LoginType === "github") {
                            return done(null, user as unknown as User);
                        } else {
                            const loginType = user.LoginType?.toLowerCase()?.split("_").join(" ");
                            return done(new HttpError(
                                `You have previously registered using ${loginType}. Please use the ${loginType} login option to access your account`,
                                400
                            ));
                        }
                    } else {
                        const newUser = await userRepo.createUser({
                            email: profile.emails && profile.emails.length > 0 ? profile.emails[0]?.value : "",
                            name: profile.displayName || profile.username || "",
                            LoginType: "github",
                            isVerified: profile.emails && profile.emails.length > 0 ? profile.emails[0]?.verified : false,
                            password: profile._json?.sub|| "",
                            image: {
                                url: profile._json?.avatar_url || "",
                                publicId: ""
                            },
                        });

                        return newUser ? done(null, newUser as unknown as User) : done(new HttpError("Failed to create user", 500));
                    }
                } catch {
                    return done(new HttpError("GitHub authentication failed", 500));
                }
            })().catch(() => {
                done(new HttpError("GitHub authentication failed", 500));
            });
        }
    ));
} catch (error) {
    if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error("Passport configuration error:", error);
    }
}


