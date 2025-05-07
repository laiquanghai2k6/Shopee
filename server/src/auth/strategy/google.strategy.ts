import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import googleOauthConfig from "../config/google-oauth.config";
import { ConfigType } from "@nestjs/config";
import e from "express";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(
        @Inject(googleOauthConfig.KEY)
        private googleConfig:ConfigType<typeof googleOauthConfig>
    ){
        super({
            clientID:googleConfig.clientID!,
            clientSecret:googleConfig.clientSecret!,
            callbackURL:googleConfig.callbackURL,
            scope:['profile','email'],
 
            
        })
    }
    async validate(  
        accessToken: string,
        refreshToken: string,
        profile: any,
        done:VerifyCallback
       ){
        console.log('strategy:',profile)
        done(null,profile)
    }
}